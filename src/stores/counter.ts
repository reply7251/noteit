import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state() {
    return {
      count: 0
    }
  },
  actions: {
    getAndIncrement() {
      return this.count++
    }
  }
  /* 
  const count = ref(0)
  function getAndIncrement() {
    return count.value++
  }

  return { count, getAndIncrement } */
})
