export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have questions about joining Vulcan Cycling or want to learn more about our programs? 
            We&apos;d love to hear from you!
          </p>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Email</h3>
            <p>info@vulcancycling.com</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Phone</h3>
            <p>(555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Address</h3>
            <p>123 Cycling Way<br />San Francisco, CA 94110</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input type="text" id="name" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea id="message" rows={5} className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

