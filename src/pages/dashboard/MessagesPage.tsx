import { DashboardLayout } from "@/components/DashboardLayout";
import { mockChatThreads, mockProfiles } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile } from "lucide-react";
import { useState } from "react";

const MessagesPage = () => {
  const [activeThread, setActiveThread] = useState(mockChatThreads[0]?.id);
  const [newMsg, setNewMsg] = useState("");

  const thread = mockChatThreads.find((t) => t.id === activeThread);
  const getProfile = (id: string) => mockProfiles.find((p) => p.id === id);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        <div className="bg-card rounded-xl border border-border shadow-card flex overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          {/* Thread list */}
          <div className="w-80 border-r border-border overflow-auto hidden md:block">
            {mockChatThreads.map((t) => {
              const p = getProfile(t.profileId);
              if (!p) return null;
              const lastMsg = t.messages[t.messages.length - 1];
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveThread(t.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeThread === t.id ? "bg-rose-light" : ""}`}
                >
                  <div className="relative">
                    <img src={p.avatar} alt={p.name} className="h-10 w-10 rounded-full object-cover" />
                    {t.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{t.unreadCount}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lastMsg?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chat window */}
          <div className="flex-1 flex flex-col">
            {thread ? (
              <>
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <img src={getProfile(thread.profileId)?.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span className="font-medium text-foreground">{getProfile(thread.profileId)?.name}</span>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-3">
                  {thread.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.senderId === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${m.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                        <p className="text-sm">{m.text}</p>
                        <p className={`text-[10px] mt-1 ${m.senderId === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex gap-2">
                  <Button size="icon" variant="outline"><Smile className="h-4 w-4" /></Button>
                  <Input placeholder="Type a message..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="flex-1" />
                  <Button size="icon"><Send className="h-4 w-4" /></Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">Select a conversation</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
