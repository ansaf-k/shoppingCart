import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-stone-300 text-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-emerald-800 mb-4">UrbanCart</h2>
            <p className="text-sm">Curating timeless elegance for the modern urbanite.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-700">Quick as</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-rose-700 transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-rose-700 transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-rose-700 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-rose-700 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-700">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-emerald-800" />
                <a href="mailto:info@urbancart.com" className="hover:text-rose-700 transition-colors">info@urbancart.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-emerald-800" />
                <a href="tel:+1234567890" className="hover:text-rose-700 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-emerald-800" />
                <span>123 Vintage Lane, Old Town, OT 12345</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-700">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-emerald-800 hover:text-rose-700 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-emerald-800 hover:text-rose-700 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-emerald-800 hover:text-rose-700 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-300 text-center">
          <p>&copy; {new Date().getFullYear()} UrbanCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

