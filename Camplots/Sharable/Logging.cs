using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Camplots.Sharable
{
    public class Logging
    {
        public static void writeLog(string serverMapPath, string text)
        {
            DateTime dt = DateTime.Now;
            using (FileStream fs = new FileStream(serverMapPath  + @"\message.log", FileMode.Append, FileAccess.Write))
            using (StreamWriter sw = new StreamWriter(fs))
            {
                sw.WriteLine(dt + ":" + text);
            }
        }
    }
}