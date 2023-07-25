export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["copy.svg","favicon-light.svg","favicon.svg","loading.svg","manifest.json","preivew.gif","service-worker.ts","share.svg","sw.js"]),
	mimeTypes: {".svg":"image/svg+xml",".json":"application/json",".gif":"image/gif",".ts":"video/mp2t",".js":"application/javascript"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.81068312.js","imports":["_app/immutable/entry/start.81068312.js","_app/immutable/chunks/index.c06f261c.js","_app/immutable/chunks/singletons.d092f264.js","_app/immutable/chunks/parse.d12b0d5b.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.731749b7.js","imports":["_app/immutable/entry/app.731749b7.js","_app/immutable/chunks/index.c06f261c.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/getGameDetails",
				pattern: /^\/api\/getGameDetails\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/getGameDetails/_server.ts.js')
			},
			{
				id: "/api/incrementPlayCount",
				pattern: /^\/api\/incrementPlayCount\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/incrementPlayCount/_server.ts.js')
			},
			{
				id: "/api/rebuttal",
				pattern: /^\/api\/rebuttal\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/rebuttal/_server.ts.js')
			},
			{
				id: "/api/updateSupabaseScores",
				pattern: /^\/api\/updateSupabaseScores\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/updateSupabaseScores/_server.ts.js')
			},
			{
				id: "/create",
				pattern: /^\/create\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
