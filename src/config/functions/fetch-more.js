async function fetchMore(channel, limit = 250) {
    if (!channel) {
      throw new Error(`Expected channel, got ${typeof channel}.`);
    }
    if (limit <= 100) {
      return channel.messages.fetch({
        limit
      });
    }

    let collection = new Discord.Collection();
    let lastId = null;
    let options = {};
    let remaining = limit;

    while (remaining > 0) {
      options.limit = remaining > 100 ? 100 : remaining;
      remaining = remaining > 100 ? remaining - 100 : 0;

      if (lastId) {
        options.before = lastId;
      }

      let messages = await channel.messages.fetch(options);

      if (!messages.last()) {
        break;
      }

      collection = collection.concat(messages);
      lastId = messages.last().id;
    }

    return collection;
  }
  // usage
  // const messages = fetchMore(interaction.channel, 500)
