const Icon = ({ name }) => {
  return (
    <svg aria-hidden="true"
      className={"lexicon-icon lexicon-icon-" + name}
      focusable="false">
      <use href={"/o/dialect-theme/images/clay/icons.svg#" + name}></use>
    </svg>
  )
}

export default Icon;