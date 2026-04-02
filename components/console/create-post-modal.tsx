"use client";

import { type FormEvent, useCallback, useId, useState } from "react";
import { IconPhoto, IconVideo, IconX } from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { useTranslations } from "next-intl";

export type CreatePostPayload = {
  body: string;
  files: File[];
};

type Props = {
  opened: boolean;
  onClose: () => void;
  authorName: string;
  authorImage?: string | null;
  onPublish?: (payload: CreatePostPayload) => void;
};

export function CreatePostModal({
  opened,
  onClose,
  authorName,
  authorImage,
  onPublish,
}: Props) {
  const t = useTranslations("ConsoleLayout.postDialog");
  const fileInputId = useId();
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const reset = useCallback(() => {
    setBody("");
    setPreviewUrls((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setFiles([]);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleFilesChange = (list: FileList | null) => {
    if (!list?.length) return;
    const next = Array.from(list);
    const imageFiles = next.filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (!imageFiles.length) return;

    setPreviewUrls((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return imageFiles.map((f) => URL.createObjectURL(f));
    });
    setFiles(imageFiles);
  };

  const removeAttachment = () => {
    setPreviewUrls((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setFiles([]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed && files.length === 0) return;
    onPublish?.({ body: trimmed, files });
    handleClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={t("title")}
      size="lg"
      radius="md"
      centered
      transitionProps={{ transition: "pop" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <Avatar src={authorImage || undefined} alt={authorName} radius="xl" size="md" />
            <div style={{ minWidth: 0, flex: 1 }}>
              <Text fw={600} size="sm">
                {authorName}
              </Text>
              <Text size="xs" c="dimmed">
                {t("asYourself")}
              </Text>
            </div>
          </Group>

          <Textarea
            autosize
            minRows={4}
            maxRows={12}
            placeholder={t("placeholder")}
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
            variant="unstyled"
            styles={{
              input: { fontSize: "var(--mantine-font-size-md)", padding: 0 },
            }}
          />

          {previewUrls.length > 0 ? (
            <Box pos="relative">
              <ScrollArea type="auto" scrollbarSize={6}>
                <Group gap="xs" wrap="nowrap" pb="xs">
                  {previewUrls.map((url, i) => (
                    <Box
                      key={url}
                      w={160}
                      h={120}
                      style={{
                        borderRadius: "var(--mantine-radius-md)",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                      }}
                    >
                      {files[i]?.type.startsWith("video/") ? (
                        <video
                          src={url}
                          controls
                          muted
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={url}
                          alt=""
                          role="presentation"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )}
                    </Box>
                  ))}
                </Group>
              </ScrollArea>
              <ActionIcon
                variant="filled"
                color="dark"
                size="sm"
                radius="xl"
                pos="absolute"
                top={8}
                right={8}
                aria-label={t("removeMedia")}
                onClick={removeAttachment}
              >
                <IconX size={14} />
              </ActionIcon>
            </Box>
          ) : null}

          <input
            id={fileInputId}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={(e) => handleFilesChange(e.currentTarget.files)}
          />

          <Group justify="space-between" align="center">
            <Group gap="xs">
              <UnstyledButton
                component="label"
                htmlFor={fileInputId}
                aria-label={t("addPhotoVideo")}
              >
                <Group gap={6} c="blue" wrap="nowrap" style={{ cursor: "pointer" }}>
                  <IconPhoto size={22} stroke={1.5} />
                  <IconVideo size={22} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Group>
            <Group gap="sm">
              <Button variant="default" type="button" onClick={handleClose}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={!body.trim() && files.length === 0}>
                {t("publish")}
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
