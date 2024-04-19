declare class SourceMapSource extends Source {
	constructor(
		source: string | Buffer,
		name: string,
		sourceMap: string | Object | Buffer,
		originalSource?: string | Buffer,
		innerSourceMap?: string | Object | Buffer,
		removeOriginalSource?: boolean
	);
	getArgsAsBuffers(): [
		Buffer,
		string,
		Buffer,
		undefined | Buffer,
		undefined | Buffer,
		boolean
	];
}

declare class RawSource extends Source {
	constructor(source: string | Buffer, convertToString?: boolean);
	isBuffer(): boolean;
}

declare class Source {
	constructor();
	size(): number;
	map(options?: MapOptions): null | RawSourceMap;
	sourceAndMap(options?: MapOptions): { source: string | Buffer; map: Object };
	updateHash(hash: Hash): void;
	source(): string | Buffer;
	buffer(): Buffer;
}

declare class ConcatSource extends Source {
	constructor(...args: (string | Source)[]);
	getChildren(): Source[];
	add(item: string | Source): void;
	addAllSkipOptimizing(items: Source[]): void;
}

declare class CachedSource extends Source {
	constructor(source: Source);
	constructor(source: Source | (() => Source), cachedData?: any);
	original(): Source;
	originalLazy(): Source | (() => Source);
	getCachedData(): any;
}

declare interface Asset {
	/**
	 * the filename of the asset
	 */
	name: string;

	/**
	 * source of the asset
	 */
	source: Source;

	/**
	 * info about the asset
	 */
	info: AssetInfo;
}


{
  "version": "0.2.0",
  "configurations": [
    
    {
      "type": "node",
      "request": "launch",
      "name": "npm run build 디버깅",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "build:dev:HOME", "--inspect-brk"],
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}