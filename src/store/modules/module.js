import { defineStore } from "pinia";
import cache from "@/plugins/cache.js";

const useModuleStore = defineStore('module', {
  state: () => {
    return {
      contentForm: cache.session.getJSON('contentForm'),
      itemInfo: {}
    }
  },
  actions: {

  },
});


export default useModuleStore;
