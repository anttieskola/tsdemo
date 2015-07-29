using Microsoft.AspNet.Mvc;

namespace tsdemo.ui.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
