export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Let&apos;s Connect
            </h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
              <a 
                href="#" 
                className="text-base hover:text-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                X/Twitter
              </a>
              <a 
                href="#" 
                className="text-base hover:text-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="text-base hover:text-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="mb-4 md:mb-0">
              <a 
                href="mailto:hello@lucacapone.io" 
                className="text-base hover:text-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1"
              >
                Contact: hello@lucacapone.io
              </a>
            </div>
          </div>

          <div className="w-full md:w-auto text-center md:text-right">
            <p className="text-base text-gray-400 mb-2">
              © 2025 Luca Capone. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Built with AI ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
