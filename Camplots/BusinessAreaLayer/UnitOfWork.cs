using System;
using mvc = System.Web.Mvc;
using Camplots.Models;

namespace Camplots.BusinessAreaLayer
{
    public class UnitOfWork
    {
        public ParksAndLandsEntities db = new ParksAndLandsEntities();
        public mvc.ModelStateDictionary modelState = null;

        public UnitOfWork(mvc.ModelStateDictionary ModelStateParm)
        {
            modelState = ModelStateParm;
        }

        public void Save(string locationIdentifier)
        {
            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                //FreshWaterBuoys.Sharable.DbUpdateError du = new FreshWaterBuoys.Sharable.DbUpdateError(FreshWaterBuoys.Sharable.Globals.appId);
                //du.logError(locationIdentifier, ex);
                modelState.AddModelError("", "Database detected error - contact OIT support");
            }
        }
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}