using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Camplots.Controllers
{
    public class sitesController : Controller
    {
        const string sitesName = "sites";
        const string logFolder = @"~\logs";
        BusinessAreaLayer.Sites sitesBAL = new BusinessAreaLayer.Sites();

        public ActionResult Checkout()
        {
            Sharable.Logging.writeLog(Server.MapPath(logFolder), "Checkout");
            return View();
        }

        public ActionResult Checkin()
        {
            return View();
        }

        public class JsonStringResult : ContentResult
        {
            public JsonStringResult(string json)
            {
                Content = json;
                ContentType = "application/json";
            }
        }

        [HttpPost]
        public ActionResult CheckUpdatesBackIn(string siteData)
        {
            string message = "";
            var sites = new List<ViewModels.Sites>();
            if (siteData != null)
            {
                sitesBAL.updateList(siteData);
                sites = sitesBAL.Get();
                Session[sitesName] = sites;
                message = sites.Count + " sites copied to the server";
            }
            else
            {
                message = "Error: null data sent to the server";
            }
            sites = (List<ViewModels.Sites>)Session[sitesName];
            string sitesInfo = "List of sites checked back in: ";
            foreach (var site in sites)
            {
                sitesInfo += site.CAMPLOT_ID + ",";
            }
            Sharable.Logging.writeLog(Server.MapPath(logFolder), sitesInfo);
            return Json(sites,JsonRequestBehavior.AllowGet);
        }

        public ActionResult getAll()
        {
            var sites = new List<ViewModels.Sites>();
            sitesBAL.populateSites();
            sites = sitesBAL.Get();
            Session[sitesName] = (List<ViewModels.Sites>)sites;
            return Json(sites, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Menu()
        {
            return View();
        }

        public ActionResult IndexOffline()
        {
            return View();
        }

        /*
         *  Display a list of sites represented on the server.
         *  Use session storage if available.  If not, display the original list.
         */
        public ActionResult IndexOnline()
        {
            List<ViewModels.Sites> sites = new List<ViewModels.Sites>();
            if (Session[sitesName] == null)
            {
                Sharable.Logging.writeLog(Server.MapPath(logFolder), "Index: Session is null, getting original list");
                sitesBAL.populateSites();
                sites = sitesBAL.Get();
            }
            else
            {
                Sharable.Logging.writeLog(Server.MapPath(logFolder), "Index: getting data from the Session");
                sites = (List<ViewModels.Sites>)Session[sitesName];
            }
            return View(sites);
        }

        public ActionResult Edit()
        {
            return View();
        }

        // GET: sites/Create
        public ActionResult Create()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
