const Loading = ({ size }) => {
  return (
    <span
      aria-hidden="true"
      className={"loading-animation loading-animation-secondary loading-animation-" + size}
    ></span>
  )
}

export default Loading;