# Create command

### Vaild commands

A valid command requires the command file to default export a `CommandBuilder`.

Data and an async function should be set through `CommandBuilder#setData` and `CommandBuilder#setExecutable`.

If data or executable should not be present, the command is ignored upon command deployment.

`CommandBuilder#setInformation` is optional, meaning that it can be omitted

### Example

```ts
const data = new SlashCommandBuilder()
  .setName('command')
  .setDescription('Description')

async function execute(interaction: ChatInputCommandInteraction) {
  interaction.reply(`some response`)
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Replies with something',
  })
```
