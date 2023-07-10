<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

import QuoteCard from "./components/quote-card/QuoteCard.vue";
import { type Quote } from "./types/quote";

const quotes = ref<Quote[]>();
const quote = ref<Quote>();
const error = ref<string>();

const handleNewQuote = (data: Quote[]) => {
  if (!data || data.length === 0) {
    quote.value = undefined;
    return;
  }
  const newQuote = data[Math.floor(Math.random() * data.length)];
  quote.value = newQuote;
};

onMounted(() => {
  axios
    .get("https://type.fit/api/quotes")
    .then(({ data }) => {
      quotes.value = data;
      handleNewQuote(data);
    })
    .catch((error) => {
      error.value = String(error);
    });
});
</script>

<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-neutral-100"
  >
    <template v-if="error">there was an error loading data </template>
    <template v-else-if="!quotes || !quote"> loading... </template>
    <template v-else>
      <QuoteCard
        :data="quote"
        @newQuote="() => handleNewQuote(quotes as Quote[])"
      />
    </template>
  </div>
</template>
