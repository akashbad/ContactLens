Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, 'nVJFdHrU4V8eKwMAncTuw', 'h0zL8SiB8hi019gREcr2RjEaVKuYcEWNWWhg8q0UKU'
  provider :linkedin, 'br4dyyks45g3', 'oqF1Os8iiwl4PITl', :scope => "r_basicprofile r_emailaddress r_network"
  provider :google_oauth2, '283706256664', 'I6Pgh1FjK9YRgkTPKD-wahlg'
end