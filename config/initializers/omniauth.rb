Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, 'nVJFdHrU4V8eKwMAncTuw', 'h0zL8SiB8hi019gREcr2RjEaVKuYcEWNWWhg8q0UKU'
  provider :linkedin, 'br4dyyks45g3', 'oqF1Os8iiwl4PITl'
end