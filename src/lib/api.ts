import axios from 'axios'

export interface IllustEntry {
  id: number
  imageUrl: string
  title: string
  tags: string[]
  width: number
  height: number
  authorName: string
  sl: number | null
}

const imageResolution = '480x960'

export const getRikkaIllusts = async (): Promise<IllustEntry[]> => {
  const URL = 'https://www.pixiv.net/ajax/search/illustrations/%E7%AB%8B%E8%8F%AF%E9%AB%98%E6%A0%A1%E3%83%9E%E3%83%BC%E3%83%81%E3%83%B3%E3%82%B0%E3%83%90%E3%83%B3%E3%83%89%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D?word=%E7%AB%8B%E8%8F%AF%E9%AB%98%E6%A0%A1%E3%83%9E%E3%83%BC%E3%83%81%E3%83%B3%E3%82%B0%E3%83%90%E3%83%B3%E3%83%89%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D&order=date_d&mode=all&p=1&s_mode=s_tag&type=illust'
  const responses = await Promise.all([
    axios.get(`${URL}&p=1`),
    axios.get(`${URL}&p=2`),
    axios.get(`${URL}&p=3`),
  ])

  return responses
    .filter(res => res.status == 200)
    .map(res => res.data.body.illust.data.filter(content => typeof content.illustId !== 'undefined'))
    .map(res =>
      res.map(
        (content): IllustEntry => ({
          id: content.illustId,
          imageUrl: content.url.replace(
            /c\/\d+x\d+\//,
            `c/${imageResolution}/`,
          ),
          title: content.title,
          tags: content.tags,
          width: content.width,
          height: content.height,
          authorName: content.userName,
          sl: null,
        }),
      ),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

