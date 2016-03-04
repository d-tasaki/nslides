# -*- coding: utf-8 -*-
class SlideParseJob < ApplicationJob
  queue_as :default

  def perform(slide, file)
    s3 = Aws::S3::Resource.new
    bucket = s3.bucket('nslides01-pages')

    images = Magick::Image.from_blob(File.open(file).read) do
      # 2000pxでサンプリングして800pxの画像に変換
      self.density  = 200
      self.geometry = 800
    end

    images.each_with_index do |img, index|
      img.format = 'PNG'
      png_data = img.to_blob
      name = SecureRandom.hex

      object = bucket.object("#{name}.png")
      object.put(
        acl: 'public-read',
        body: png_data
      )
      page = slide.pages.create(
        image_src: object.public_url,
        width: img.columns,
        height: img.rows,
        num: index+1
      )
    end
    slide.status = :enabled
    slide.save
  end
end
