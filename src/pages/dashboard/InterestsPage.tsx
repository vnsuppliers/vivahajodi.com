import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReceivedInterestsPage } from "./ReceivedInterestsPage";
import { SentInterestsPage } from "./SentInterestsPage";

export const InterestsPage = () => {
  return (
    <Tabs defaultValue="received" className="space-y-4">
      <TabsList>
        <TabsTrigger value="received">Received</TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
      </TabsList>

      <TabsContent value="received">
        <ReceivedInterestsPage />
      </TabsContent>

      <TabsContent value="sent">
        <SentInterestsPage />
      </TabsContent>
    </Tabs>
  );
};