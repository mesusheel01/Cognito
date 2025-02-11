const LiveSearch = () => {
    return (
      <div className="max-w-xl mx-auto p-4">
        <div className="relative border-2 rounded-xl border-myGreen overflow-hidden">
          <input
            type="text"
            placeholder="Enter to get the p depth of the context!"
            className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-myGreen/50 transition-all"
          />
        </div>
      </div>
    )
  }
export default LiveSearch
