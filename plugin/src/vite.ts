import type { Plugin } from "vite";
import workerComponent from "./vite/workerComponent";
import workerFile from "./vite/workerFile";
import handleImports from "./vite/handleImports";
import registerComponents from "./vite/registerComponents";

export default function plugin(): Plugin[] {
  return [
    registerComponents(),
    workerFile(),
    handleImports(),
    workerComponent(),
  ];
}

// let config: ResolvedConfig;

// return {
//   enforce: "post",
//   name: "react-worker-components",
//   configResolved: (_config) => {
//     config = _config;
//   },
//
//   async transform(src, id) {
//     const imports = parse(src)[0];
//     const workerComponentImports = importsWorkerComponent(imports);
//     if (workerComponentImports.length) {
//       const s = new MagicString(src);
//       let index = 0;
//       for (const {
//         ss: statementStart,
//         se: statementEnd,
//         n,
//       } of workerComponentImports) {
//         const importContent = /\{(.*?)\}/.exec(
//           src.substring(statementStart, statementEnd)
//         )?.[1];
//
//         const importObject = importContent
//           ?.split(",")
//           ?.map((i) => {
//             return i.replace("as", ":");
//           })
//           .join(",");
//
//         s.remove(statementStart, statementEnd);
//         const newContent = `
//         import { wrap } from 'react-worker-components-plugin/rwc';
//         import __RWC_WORKER_${index} from '${n}';
//
//         const { ${importObject} } = wrap(() => new __RWC_WORKER_${index}());
//           `;
//         s.prepend(newContent);
//
//         index++;
//       }
//
//       return {
//         code: s.toString(),
//         map: s.generateMap(),
//       };
//     }
//
//     const query = parseWorkerRequest(id);
//     if (query && query[WorkerFileId] != null) {
//       await init;
//
//       const s = new MagicString(src);
//       const exports = parse(src)[1];
//       const exposedExports = exports
//         .filter(isComponentishName)
//         .map((component) => `\nexpose(${component})`)
//         .join("");
//
//       s.prepend(
//         `import { expose } from 'react-worker-components-plugin/rwc'\n`
//       );
//       s.append(exposedExports);
//
//       s.prepend(`import '${ENV_PUBLIC_PATH}'\n`);
//       return {
//         code: s.toString(),
//         map: s.generateMap(),
//       };
//     }
//     if (isWorkerComponent(id)) {
//       const url = injectQuery(
//         await fileToUrl(cleanUrl(id), config, this),
//         WorkerFileId
//       );
//
//       const workerConstructor = "Worker";
//       const workerOptions = { type: "module" };
//
//       const result = `export default function WorkerWrapper() {
//         return new ${workerConstructor}(${JSON.stringify(
//         url
//       )}, ${JSON.stringify(workerOptions, null, 2)})
//       }
//       `;
//       const s = new MagicString(result);
//       return { code: s.toString(), map: s.generateMap() };
//     }
//
//     return null;
//   },
// };
