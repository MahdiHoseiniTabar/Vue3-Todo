import { defineStore } from 'pinia'
const sessionKey = 'TodoLists'

export const useStore = defineStore('TodoLists', {
  state: () => {
    const sessionLists = sessionStorage.getItem(sessionKey)

    return {
      lists: sessionLists ? JSON.parse(sessionLists) : {}
    }
  },
  getters: {
    searchedItems: (state) => {
      return (query) => {
        const items = []
        Object.values(state.lists).forEach((list) => {
          list.forEach((item) => {
            if (item.title.includes(query) || item.des.includes(query)) {
              items.push(item)
            }
          })
        })
        return items
      }
    },
    upcomingItem: (state) => {
      const now = Date.now()
      let upcomingItem = {}
      Object.values(state.lists).forEach((list) => {
        list.forEach((item) => {
          const ms = new Date(item.date).getTime()
          if (ms - now >= 0) {
            if (
              !upcomingItem.date ||
              (upcomingItem.date && ms < new Date(upcomingItem.date).getTime())
            ) {
              upcomingItem = item
            }
          }
        })
      })
      return upcomingItem
    }
  },
  actions: {
    addNewList(name) {
      this.lists[name] = []
      sessionStorage.setItem(sessionKey, JSON.stringify(this.lists))
    },
    addItem(newItem, listName) {
      this.lists[listName].push(newItem)
      sessionStorage.setItem(sessionKey, JSON.stringify(this.lists))
    },
    removeItem(itemIndex, listName) {
      this.lists[listName]?.splice(itemIndex, 1)
      sessionStorage.setItem(sessionKey, JSON.stringify(this.lists))
    },
    updateItem(newItem, listName) {
      this.lists[listName][newItem.index] = newItem
      sessionStorage.setItem(sessionKey, JSON.stringify(this.lists))
    }
  }
})
