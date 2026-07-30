import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MessagesService } from "../../services/messages.service";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile, ArrowLeft, MessageSquareOff } from "lucide-react";
import { decodeId, encodeId } from "@/utils/encodeId";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const MessagesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [threads, setThreads] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Can be number code or string code ("BLOCKED", "SUSPENDED", etc.)
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const getMyUserId = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("matrimony_user_data") ?? "{}");
      const token = userData?.access_token;
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub;
    } catch {
      return null;
    }
  };

  const myUserId = getMyUserId();

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const startPolling = (chatId: number) => {
    stopPolling();
    pollingRef.current = setInterval(async () => {
      try {
        const msgs = await MessagesService.getMessages(chatId);
        setMessages(Array.isArray(msgs) ? msgs : []);
      } catch { }
    }, 3000);
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const getMemberDisplayName = (member: any) => {
    const u = member?.user;
    return u ? `${u.first_name || ""} ${u.last_name || ""}`.trim() : "Unknown";
  };

  const getMemberInitials = (member: any) => {
    const u = member?.user;
    const first = u?.first_name?.[0] || "";
    const last = u?.last_name?.[0] || "";
    return (first + last).toUpperCase();
  };

  const getActiveChatName = (chat: any) => {
    if (!chat?.participants) return "Chat";
    const other = chat.participants.find((p: any) => Number(p.user?.id) !== Number(myUserId));
    const u = other?.user;
    return u ? `${u.first_name || ""} ${u.last_name || ""}`.trim() : "Chat";
  };

  const handleCatchError = (err: any) => {
    const backendMessage = err?.response?.data?.message || "";
    const errorCode = err?.response?.data?.errorCode || "";
    const status = err?.response?.status;
    setStatusMessage(backendMessage);

    if (status === 402 || status === 426) {
      setUserStatus(5);
    } else if (status === 403) {
      if (errorCode === "BLOCKED") {
        setUserStatus("BLOCKED");
      } else if (errorCode === "UNDER_REVIEW") {
        setUserStatus(0);
      } else if (errorCode === "DEACTIVATED") {
        setUserStatus(3);
      } else if (errorCode === "SUSPENDED") {
        setUserStatus(2);
      } else {
        const lowerMsg = backendMessage.toLowerCase();
        if (lowerMsg.includes("blocked")) setUserStatus("BLOCKED");
        else if (lowerMsg.includes("deactivated")) setUserStatus(3);
        else if (lowerMsg.includes("suspended")) setUserStatus(2);
        else setUserStatus(0);
      }
    } else if (status === 401) {
      setUserStatus(4);
    } else {
      setUserStatus(0);
    }
  };

  const openChat = useCallback(async (chat: any, targetUserId?: number) => {
    try {
      setActiveChat(chat);
      if (targetUserId) setActiveMemberId(targetUserId);
      const msgs = await MessagesService.getMessages(chat.id);
      setMessages(Array.isArray(msgs) ? msgs : []);
      scrollToBottom();
      startPolling(chat.id);
    } catch (err: any) {
      handleCatchError(err);
    }
  }, []);

  useEffect(() => {
    MessagesService.getThreads()
      .then((data) => {
        if (data?.is_premium === false || data?.premium_required) {
          setUserStatus(5);
          setIsLoading(false);
          return;
        }
        setThreads(Array.isArray(data) ? data : []);
        setUserStatus(1);
        setIsLoading(false);
      })
      .catch((err) => {
        handleCatchError(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading || userStatus !== 1) return;
    const encodedUserId = searchParams.get("user");
    if (!encodedUserId) return;
    const targetUserId = decodeId(encodedUserId);
    if (!targetUserId) return;

    MessagesService.getOrCreateChat(targetUserId)
      .then((chat) => openChat(chat, targetUserId))
      .catch((err) => handleCatchError(err));
  }, [isLoading, searchParams, userStatus]);

  const handleSelectThread = async (member: any) => {
    if (userStatus !== 1) return;
    try {
      const targetUserId = member.user.id;
      const chat = await MessagesService.getOrCreateChat(targetUserId);
      navigate(`/dashboard/messages?user=${encodeId(targetUserId)}`, { replace: true });
      await openChat(chat, targetUserId);
    } catch (err) {
      handleCatchError(err);
    }
  };

  const handleSendMessage = async () => {
    if (!activeChat || !newMsg.trim() || userStatus !== 1) return;
    try {
      await MessagesService.sendMessage({ chatId: activeChat.id, message: newMsg });
      setNewMsg("");
      setShowEmojiPicker(false);
      const msgs = await MessagesService.getMessages(activeChat.id);
      setMessages(Array.isArray(msgs) ? msgs : []);
      scrollToBottom();
    } catch (err) {
      handleCatchError(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMsg((prev) => prev + emojiData.emoji);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-sm text-muted-foreground animate-pulse font-medium">
          Loading conversation channels...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-md hover:bg-muted transition text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        </div>

        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : (
          <div className="bg-card rounded-xl border border-border shadow-card flex overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
            {/* Thread list */}
            <div className="w-80 border-r border-border overflow-auto hidden md:block bg-card">
              {threads.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center h-full space-y-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <MessageSquareOff className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[180px] leading-relaxed">
                    No conversation history found. Connect with matches to initialize chats.
                  </p>
                </div>
              ) : (
                threads.map((member) => {
                  const displayName = getMemberDisplayName(member);
                  const initials = getMemberInitials(member);
                  const isActive = Number(member.user?.id) === Number(activeMemberId);
                  const isOnline = member.user?.is_online === 1 || member.user?.is_online === true;

                  return (
                    <button
                      key={member.id}
                      onClick={() => handleSelectThread(member)}
                      className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors border-b border-border/40 ${isActive ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                    >
                      <div className="relative shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${isActive ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground"}`}>
                          {initials || "?"}
                        </div>
                        {isOnline && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>{displayName}</p>
                        <p className={`text-xs truncate ${isOnline ? "text-green-500" : "text-muted-foreground"}`}>{isOnline ? "Online" : "Click to open chat"}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Chat window */}
            <div className="flex-1 flex flex-col bg-background/50">
              {activeChat ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b border-border flex items-center gap-3 bg-card">
                    {(() => {
                      const activeMember = threads.find((m) => Number(m.user?.id) === Number(activeMemberId));
                      const isOnline = activeMember?.user?.is_online === 1 || activeMember?.user?.is_online === true;
                      const initials = getMemberInitials(activeMember);
                      return (
                        <>
                          <div className="relative shrink-0">
                            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm">{initials || "?"}</div>
                            {isOnline && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />}
                          </div>
                          <div>
                            <p className="font-medium text-foreground leading-tight">{getActiveChatName(activeChat)}</p>
                            {isOnline && <p className="text-xs text-green-500 mt-0.5">Online</p>}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 overflow-auto p-4 space-y-2">
                    {messages.length === 0 && <p className="text-center text-sm text-muted-foreground pt-8 font-medium">No messages yet. Say hello!</p>}
                    {messages.map((m: any) => {
                      const isMine = Number(m.sender?.id) === Number(myUserId);
                      const isEmojiOnly = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+$/u.test(m.message?.trim());

                      return (
                        <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[70%] break-words shadow-sm ${isEmojiOnly ? "text-3xl leading-none px-1 py-0.5 shadow-none" : `rounded-2xl px-4 py-2 text-sm border ${isMine ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"}`}`}>
                            {m.message}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input section */}
                  <div className="p-4 border-t border-border flex gap-2 items-center relative bg-card">
                    {showEmojiPicker && (
                      <div ref={emojiPickerRef} className="absolute bottom-16 left-4 z-50">
                        <EmojiPicker onEmojiClick={handleEmojiClick} height={380} width={300} />
                      </div>
                    )}
                    <Button size="icon" variant="outline" onClick={() => setShowEmojiPicker((prev) => !prev)} className={showEmojiPicker ? "bg-muted" : ""}>
                      <Smile className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Input placeholder="Type a message..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-background" />
                    <Button size="icon" onClick={handleSendMessage} className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm"><Send className="h-4 w-4" /></Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm font-medium">
                  Select a conversation or open one from a profile
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;