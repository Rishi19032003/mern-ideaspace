import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handelSubmit = async (e) => {
    if (!title.trim() || !content.trim()) {
      e.preventDefault()
      toast.error("All fields are required")
      return
    }

    setLoading(true)

    try {
      await axios.post("http://")
    } catch (error) {
      
    } finally {
      
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            To Home
          </Link>

          <div className="card bg-[#201d1d]">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handelSubmit}>
                {/* Title of the Note */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Enter note title" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                {/* Content of the Note */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder="Write your note here..." className="textarea textarea-bordered h-32" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>

                {/* Making of the create button */}
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    { loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage