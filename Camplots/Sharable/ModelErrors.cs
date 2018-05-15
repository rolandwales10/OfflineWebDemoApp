using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Camplots.Sharable
{
    public class ModelErrors
    {
        public class Error
        {
            public Error(string key, string message)
            {
                Key = key;
                Message = message;
            }

            public string Key { get; set; }
            public string Message { get; set; }
        }
        public List<Error> toList(ModelStateDictionary ModelState)
        {
            /*
          * Capture model errors to send to the client and display to the user
          */
            var errors = new List<Error>();
            var erroneousFields = ModelState.Where(ms => ms.Value.Errors.Any())
                                            .Select(x => new { x.Key, x.Value.Errors });

            foreach (var erroneousField in erroneousFields)
            {
                var fieldKey = erroneousField.Key;
                var fieldErrors = erroneousField.Errors
                                   .Select(error => new Error(fieldKey, error.ErrorMessage));
                errors.AddRange(fieldErrors);
            }
            return errors;
        }
    }
}