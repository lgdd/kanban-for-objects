# Kanban Objects

A client extension for Liferay to manage in a Kanban board any custom Object with states.

![preview](https://github.com/lgdd/doc-assets/blob/main/kanban-objects/kanban-objects-2.png?raw=true)

## Configuration

By default, you can select an Object definition and it will display a board according to the states for that definition:

![preview](https://github.com/lgdd/doc-assets/blob/main/kanban-objects/kanban-objects-1.png?raw=true)

If you want to always display the board of a given Object definition, you can configure the widget in Liferay to give the Object definition ID or ERC as follows:

```properties
id=32830
# or
erc=C_TASK
```