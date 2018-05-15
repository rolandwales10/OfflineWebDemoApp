using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OfflineConceptCamplots.Controllers
{
    public class ManifestController : Controller
    {
        public ActionResult Index()
        {
            var now = DateTime.Now;
            var manifest = "CACHE MANIFEST" + Environment.NewLine +
                //"# App Markup Date: " + System.IO.File.GetLastWriteTime(Server.MapPath("~/Views/Mobile/Index.cshtml")) + Environment.NewLine +
                //"# Server Assembly Version: " + this.GetType().Assembly.GetName().Version + Environment.NewLine +
                Url.Content("#3") + Environment.NewLine +
                "CACHE:" + Environment.NewLine +
                Url.Content("~/") + Environment.NewLine +
                //Url.Content("~/Home") + Environment.NewLine +
                Url.Content("~/Home/Index") + Environment.NewLine +
                Url.Content("~/sites/Edit") + Environment.NewLine +
                Url.Content("~/sites/IndexOffline") + Environment.NewLine +
                Url.Content("~/sites/Menu") + Environment.NewLine +

                Url.Content("~/Content/bootstrap.min.css") + Environment.NewLine +
                Url.Content("~/Content/site.css") + Environment.NewLine +

                Url.Content("~/Scripts/App/HomeBase.js") + Environment.NewLine +
                Url.Content("~/Scripts/App/sitesEdit.js") + Environment.NewLine +
                Url.Content("~/Scripts/App/sitesIndex.js") + Environment.NewLine +
                Url.Content("~/Scripts/App/sitesInsert.js") + Environment.NewLine +
                Url.Content("~/Scripts/App/OpenCamplotsOfflineDB.js") + Environment.NewLine +
                Url.Content("~/Scripts/App/UpdateSite.js") + Environment.NewLine +
                Url.Content("~/Scripts/CustomUtility/Edits.js") + Environment.NewLine +
                Url.Content("~/Scripts/CustomUtility/messageDisplay.js") + Environment.NewLine +
                Url.Content("~/Scripts/DBScripts/deleteAll.js") + Environment.NewLine +
                Url.Content("~/Scripts/DBScripts/deleteRow.js") + Environment.NewLine +
                Url.Content("~/Scripts/DBScripts/getAll.js") + Environment.NewLine +
                Url.Content("~/Scripts/DBScripts/getRow.js") + Environment.NewLine +

                Url.Content("~/Scripts/bootstrap.min.js") + Environment.NewLine +
                Url.Content("~/Scripts/jquery-1.10.2.min.js") + Environment.NewLine +
                Url.Content("~/Scripts/jquery-1.10.2.min.map") + Environment.NewLine +
                Url.Content("~/Scripts/modernizr-2.6.2.js") + Environment.NewLine +
                Url.Content("~/Scripts/respond.min.js") + Environment.NewLine +
                "NETWORK:" + Environment.NewLine +
                Url.Content("~/sites/Index") + Environment.NewLine +
                "*" + Environment.NewLine;
            Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
            return Content(manifest, "text/cache-manifest");
        }

    }
}

