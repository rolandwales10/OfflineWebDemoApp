using System.Data.Entity;
using mvc = System.Web.Mvc;
using Newtonsoft.Json.Linq;
using mdl = Camplots.Models;
using System.Collections.Generic;

namespace Camplots.BusinessAreaLayer
{
    public class Sites
    {
        List<ViewModels.Sites> sites = null;
        public Sites()
        {
            sites = new List<ViewModels.Sites>();
        }

        public List<ViewModels.Sites> Get()
        {
            return sites;
        }

        public void updateList(string siteData)
        {
            mdl.sites site = new mdl.sites();
            JObject JSites = null;
            JSites = JObject.Parse(siteData);
            sites.Clear();
            foreach (var siteD in JSites["sites"])
            {
                sites.Add(new ViewModels.Sites() { CAMPLOT_ID = (int)siteD["CAMPLOT_ID"], LOCATION = (string)siteD["LOCATION"] });
            }
        }

        public void populateSites()
        {
            sites.Add(new ViewModels.Sites() { CAMPLOT_ID = 1, LOCATION = "Roaring Brook" });
            sites.Add(new ViewModels.Sites() { CAMPLOT_ID = 3, LOCATION = "Hermit Island" });
            sites.Add(new ViewModels.Sites() { CAMPLOT_ID = 4, LOCATION = "Bar Harbor" });
            sites.Add(new ViewModels.Sites() { CAMPLOT_ID = 6, LOCATION = "Katahdin Stream" });
            sites.Add(new ViewModels.Sites() { CAMPLOT_ID = 7, LOCATION = "Sebago Lake" });
        }
    }
}