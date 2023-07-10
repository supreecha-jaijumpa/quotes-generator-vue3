<script setup lang="ts">
import { PropType } from "vue";

import CopyToClipboard from "../copy-to-clipboard/CopyToClipboard.vue";
import { type Quote } from "../../types/quote";

defineProps({
  data: {
    type: Object as PropType<Quote>,
    required: true,
  },
});

defineEmits<{
  (e: "newQuote"): void;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg border w-full max-w-md py-4 px-8">
    <p
      class="inline text-2xl relative before:text-slate-400 before:content-['“'] before:font-serif before:text-3xl before:mr-1 after:text-slate-400 after:content-['”'] after:font-serif after:text-3xl after:ml-1"
    >
      {{ data.text }}
    </p>
    <p class="text-right text-sm font-medium italic mt-4">{{ data.author }}</p>
    <hr class="my-5" />
    <div class="flex justify-between">
      <button
        title="generate new quote"
        class="border border-slate-400 rounded px-2 py-1 hover:bg-slate-50 hover:shadow-md"
        @click="$emit('newQuote')"
      >
        New Quote
      </button>
      <CopyToClipboard :text="data.text" />
    </div>
  </div>
</template>
