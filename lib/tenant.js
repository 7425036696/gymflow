export function withTenant(query, tenantId) {
  return { ...query, tenantId };
}
