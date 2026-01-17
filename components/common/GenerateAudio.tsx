import { useState, useCallback } from "react";
import { Stack, Card, Flex, Text, Button, Box, useToast } from "@sanity/ui";
import { useFormValue } from "sanity";

export function GenerateAudioInput(props: any) {
  // 1. Grab necessary data from the document context
  const docId = useFormValue(["_id"]) as string;
  const bodyBlocks = useFormValue(["content"]);
  const title = useFormValue(["title"]);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // 2. The Trigger Function
  const handleGenerate = useCallback(async () => {
    // Basic validation
    if (!docId) return;
    if (!bodyBlocks) {
      toast.push({ status: "warning", title: "No text to convert!" });
      return;
    }
    setIsLoading(true);
    try {
      // 3. Call YOUR Next.js API
      // Note: Use full URL if Studio is hosted separately, or relative if embedded in Next.js
      const response = await fetch("/api/sanity/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: docId.replace("drafts.", ""), // Handle draft IDs safely
          title: title,
          body: bodyBlocks,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Generation failed");

      toast.push({
        status: "success",
        title: "Success!",
        description: "Audio generated and attached to field.",
      });

      // No need to manually set value; Sanity's real-time engine will update the UI
    } catch (err: any) {
      console.error(err);
      toast.push({
        status: "error",
        title: "Generation Failed",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [docId, bodyBlocks, title, toast]);

  // 4. Render the UI
  return (
    <Stack space={3}>
      {/* Render the default file upload UI (so you can still upload manually) */}
      {props.renderDefault(props)}

      <Card padding={3} border radius={2} tone="primary">
        <Flex align="center" justify="space-between" gap={3}>
          <Box flex={1}>
            <Text size={1} weight="semibold">
              AI Narration (ElevenLabs)
            </Text>
            <Text size={1} muted style={{ marginTop: "5px" }}>
              {props.value?.asset
                ? "Audio exists. Click to regenerate if text changed."
                : "No audio yet. Click to generate from Body text."}
            </Text>
          </Box>
          <Button
            text={isLoading ? "Generating..." : "Generate Audio"}
            mode="ghost"
            tone={props.value?.asset ? "caution" : "primary"}
            disabled={isLoading || !bodyBlocks}
            onClick={handleGenerate}
          />
        </Flex>
      </Card>
    </Stack>
  );
}
