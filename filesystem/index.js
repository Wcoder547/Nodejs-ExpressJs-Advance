import fs from "fs";
import express from "express";

const app = express();
const port = 3000;

app.get("/write-file", (req, res) => {
  fs.writeFile("./public/output.txt", "this is the messgae", (err) => {
    if (err) {
      return res.status(500).send("failed to write file");
    }
    res.send("file written successfully!!");
  });
});

app.get("/read-file", (req, res) => {
  fs.readFile("./public/output.txt", (err, data) => {
    if (err) {
      return res.status(500).send("file not found");
    }
    res.setHeader("content-Type", "text/plain");
    res.send(data);
  });
});
app.get("/rename-file", (req, res) => {
  fs.rename("./public/output.txt", "./public/ok.txt", (err) => {
    if (err) {
      return res.status(500).send("failed to rename files");
    }
    res.send("file rename successfully");
  });
});

app.get("/stream-text", (req, res) => {
  const fileStream = fs.createReadStream("./public/ok.txt");
  fileStream.on("open", () => {
    fileStream.pipe(res);
  });
  fileStream.on("error", () => {
    return res.status(500).send("file not found or error reading file");
  });
});

app.get("/append-file", (req, res) => {
  fs.appendFile("./public/output.txt", "\nNew line added", (err, data) => {
    if (err) {
      return res.status(500).send("failed to append data");
    }
    res.send("contact appended");
  });
});
app.get("/delete-file", (req, res) => {
  fs.unlink("./public/output.txt", (err) => {
    if (err) {
      return res.status(500).send("failed to delete file ");
    }
    res.send("file deleted successfully");
  });
});

app.get("/read-folder", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      console.log(file);
    });
  });
});

app.get("/create-folder", (req, res) => {
  fs.mkdir("./public/myFolder", (err, files) => {
    if (err) {
      return res.status(500).send("failed to create folder");
    }
    res.send("folder created successfully");
  });
});
app.get("/rename-folder", (req, res) => {
  fs.rename("./public/myFolder", "./public/okFolder", (err) => {
    if (err) {
      return res.status(500).send("failed to rename folder");
    }
    res.send("folder rename successfully");
  });
});
app.get("/delete-folder", (req, res) => {
  fs.rmdir("./public/okFolder", (err) => {
    if (err) {
      return res.status(500).send("error deleting folder");
    }
    res.send("folder deleted successfully");
  });
});
app.get("/read-pdf", (req, res) => {
  fs.readFile("./public/data.pdf", (err, data) => {
    if (err) {
      return res.status(500).send("error pdf not found");
    }
    res.setHeader("content-Type", "application/pdf");
    res.send(data);
  });
});
app.get("/read-json", (req, res) => {
  fs.readFile("./public/data.json", (err, data) => {
    if (err) {
      return res.status(500).send("error json not found");
    }
    res.setHeader("content-Type", "application/json");
    res.send(data);
  });
});
// Get file info
app.get("/stat-file", (req, res) => {
  fs.stat("./public/output.txt", (err, stats) => {
    if (err) {
      return res.status(500).send("failed to get file info");
    }
    res.json({
      isFile: stats.isFile(),
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      mode: stats.mode,
    });
  });
});

// Check file/folder existence and permissions
app.get("/access", (req, res) => {
  const filePath = "./public/output.txt";
  // fs.constants.F_OK checks for existence, R_OK for read, W_OK for write
  fs.access(
    filePath,
    fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    (err) => {
      if (err) {
        return res
          .status(403)
          .send("File does not exist or insufficient permissions");
      }
      res.send("File exists and has read/write permissions");
    }
  );
});

// Get folder info
app.get("/stat-folder", (req, res) => {
  fs.stat("./public", (err, stats) => {
    if (err) {
      return res.status(500).send("failed to get folder info");
    }
    res.json({
      isDirectory: stats.isDirectory(),
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      mode: stats.mode,
    });
  });
});

app.get("/write-json", (req, res) => {
  const data = { name: "waseem akram" };
  fs.writeFile("./public/data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).send("failed to write JSOn file", err);
    }

    res.send("json file written successfully");
  });
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
