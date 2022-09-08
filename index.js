const Docker = require("dockerode");
const Stream = require("stream");

const docker = new Docker();

const writableStream = new Stream.Writable();
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  next();
};
const runImage = async () => {
  const arguments = ['node', 'index.js', 'hello'];
  const containerOptions = {
    Tty: false
  }
  try {
    const [output, container] = await docker.run(
      "node-docker/example",
      arguments,
      [writableStream, process.stderr],
      containerOptions
    );
    if (output.StatusCode === 0) {
      console.log('Container is finished')
    }
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
runImage();
