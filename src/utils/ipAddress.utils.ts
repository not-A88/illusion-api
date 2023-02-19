export = (ip: string): string => {
  const r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const t = ip.match(r);
  const ipp = t![0].toString() || '';
  return ipp;
};
