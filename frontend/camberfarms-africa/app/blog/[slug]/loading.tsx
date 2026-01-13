export default function LoadingBlog() {
  return (
    <div className="w-full bg-[#F3F5F7] md:pt-38.25 md:px-25 px-6 pt-15 pb-19.5 animate-pulse">

      <div className="w-full h-55 md:h-120 bg-gray-300 rounded-3xl mb-10" />

      <div className="h-6 w-3/4 bg-gray-300 rounded mb-4" />
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-10" />

      {[1, 2, 3].map(i => (
        <div key={i} className="mb-10">
          <div className="h-5 w-1/2 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}
