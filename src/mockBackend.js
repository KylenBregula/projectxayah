const mockBackend = {
  temperature: 72,
  humidity: 45,
  fanSpeed: 50,
  heatOn: false,
  acOn: false,
  lights: { kitchen: false, bedroom: false, livingRoom: false },
  airPurifierOn: false,

  updateDevice: (device, value) => {
    console.log(`Mock API: ${device} -> ${JSON.stringify(value)}`);
    mockBackend[device] = value;
    // Simulate async API call
    return Promise.resolve(mockBackend[device]);
  }
};

export default mockBackend;
