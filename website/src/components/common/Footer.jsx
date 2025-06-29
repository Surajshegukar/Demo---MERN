import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
  {/* Footer illustration */}
  <div
    className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
    aria-hidden="true"
  ></div>

  <div className="grid grid-cols-1 gap-10 py-8 sm:grid-cols-2 md:grid-cols-4 md:py-12">
    {/* 1st block */}
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-200">Services</h3>
      <ul className="space-y-2 text-sm">
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Website</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Mobile App</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Digital Marketing</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Graphics Designing</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">QA Testing</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Maintenance</a></li>
      </ul>
    </div>

    {/* 2nd block */}
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-200">Important Links</h3>
      <ul className="space-y-2 text-sm">
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">About us</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Our Product</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Blog</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Careers</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Our Clients</a></li>
      </ul>
    </div>

    {/* 3rd block */}
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-200">Resources</h3>
      <ul className="space-y-2 text-sm">
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Privacy Policy</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Terms and Conditions</a></li>
        <li><a className="text-indigo-200/65 hover:text-indigo-500" href="#">Report a vulnerability</a></li>
      </ul>
    </div>

    {/* 4th block - Logo and Socials */}
    <div className="space-y-4">
      <div><Logo /></div>
      <p className="text-sm text-indigo-200/65">
        <span className="text-gray-700">QUICKENSOL IT SOLUTIONS LLP </span>
        <a className="text-indigo-200/65 hover:text-indigo-500 ml-1" href="#">Quickensol IT Solutions LLP turns ideas into digital solutions with expert-driven global experience </a>
      </p>
      <ul className="flex gap-3">
        {/* Twitter */}
        <li>
          <a className="text-indigo-500 hover:text-indigo-400" href="#" aria-label="Twitter">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 32 32"><path d="..." /></svg>
          </a>
        </li>
        {/* Medium */}
        <li>
          <a className="text-indigo-500 hover:text-indigo-400" href="#" aria-label="Medium">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 32 32"><path d="..." /></svg>
          </a>
        </li>
        {/* GitHub */}
        <li>
          <a className="text-indigo-500 hover:text-indigo-400" href="#" aria-label="Github">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 32 32"><path d="..." /></svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

    </footer>
  );
}
