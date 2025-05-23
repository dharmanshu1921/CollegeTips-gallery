import PhotoGallery from "@/components/photo-gallery"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">CollegeTips.in</div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Photo Gallery
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Explore our journey as India's biggest recruiter of interns! From team moments to creative campaigns, see
            how we're revolutionizing the internship experience for students across the country.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            <p>
              Designed & Developed by <span className="font-semibold text-green-600">Dharmanshu Singh</span>
            </p>
            <p>Interactive Photo Gallery for CollegeTips.in</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">🚀 India's Biggest Recruiter</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">💼 Internship Programs</span>
            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">🎯 Student Success</span>
          </div>
        </header>
        <PhotoGallery />
      </div>
    </main>
  )
}
