const Code = ({ id }: { id: string }) => {
  return (
    <div className="">
      <script src={`https://gist.github.com/nikitattt/${id}.js`}></script>
    </div>
  )
}

export default Code
