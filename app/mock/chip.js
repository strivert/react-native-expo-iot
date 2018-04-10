export default mock => {
  mock.onGet('device-id').reply(200, {
    id: 'mocked device id',
  })

  mock.onGet('public-key').reply(200, {
    r: 0,
    b: '30819F300D06092A864886F70D010101050003818D0030818902818100BC5CD7F4AAED6F38C5CA2298D826D477D0E5E9052E953CE13F89E825C92549B19294932813227DEC886EB93ECD3CEC870FEBACC34FC5B1A2242A800F5C27E6BB41ED57638D190A0BAC4439BA217552F1C7E603D75BE04ED6B8680B3A9810E62DE2AA8D2464433E48D6D78AF26261F5D19C8EF1D23FC3B5AABB76FFB6360C84490203010001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  })

  mock.onPost('configure-ap').reply(200, {
    r: 0,
  })

  mock.onPost('connect-ap').reply(200, {
    r: 0,
  })

  mock.onGet('scan-ap').reply(200, {
    scans: [
      {ssid: 'home-wifi', rssi: -30, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi', rssi: -50, sec: 1, ch: 1, mdr: 1},
      {ssid: 'unlocked-wifi', rssi: -40, sec: 0, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi2', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi3', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi4', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi5', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi6', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi7', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi8', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi9', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi10', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi11', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi12', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi13', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi14', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi15', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi16', rssi: -60, sec: 1, ch: 1, mdr: 1},
      {ssid: 'noobs-wifi17', rssi: -60, sec: 1, ch: 1, mdr: 1},
    ]}
  )
}
