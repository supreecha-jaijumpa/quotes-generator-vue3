import { Ref, ref } from "vue";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export const useCopyToClipboard = (): [Ref<CopiedValue>, CopyFn] => {
  const copiedText = ref<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      copiedText.value = text;
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      copiedText.value = null;
      return false;
    }
  };

  return [copiedText, copy];
};
