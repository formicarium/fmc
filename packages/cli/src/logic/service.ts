export const getServiceIdentifier = (serviceName: string, shard?: string) => shard ? `${serviceName}-${shard}` : serviceName
