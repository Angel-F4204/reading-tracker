function LibraryControls() {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-2">Library Controls</h2>

      <div className="flex gap-3">
        <select className="border rounded p-2">
          <option>All</option>
          <option>To Read</option>
          <option>Reading</option>
          <option>Finished</option>
        </select>

        <select className="border rounded p-2">
          <option>Title</option>
          <option>Author</option>
          <option>Date Added</option>
        </select>
      </div>
    </section>
  );
}

export default LibraryControls;
