# Kanban Objects

A client extension for Liferay to manage in a Kanban board any custom Object with a state.

## Configuration

By default, you can select an Object definition and it will display a board according to the states for that definition.

If you want to always display the board of a given Object definition, you can configure the widget in Liferay to give the Object definition ID or ERC as follows:

```properties
id=32830
# or
erc=C_TASK
```