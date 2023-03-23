import mineflayer from 'mineflayer';
import { logChatSystem } from './logChatSystem.js';

export function listInventory(message, bot) {
    async function listInventory() {
      let inventoryString = "";
      let items = bot.inventory.items();
      let itemCount = 0;
      for (let a = 0; a < items.length; a++) {
        itemCount++;
        let item = items[a];
        inventoryString += `${item.name} x ${item.count}\n`;
      }
      console.log('**Inventory Contents:**\n' + inventoryString + '\nRemaining Slots: ' + (36 - itemCount));
      logChatSystem('**Inventory Contents:**\n' + inventoryString + '\nRemaining Slots: ' + (36 - itemCount))
      message.reply('**Inventory Contents:**\n' + inventoryString + '\nRemaining Slots: ' + (36 - itemCount));
    }
  
    listInventory();
  }
