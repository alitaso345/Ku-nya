import { h, Component } from 'preact'
import {
  Options,
  setAspectRatioSettings,
  setExcludingTags,
} from '../lib/options'
import AspectRatioSettingSection from './AspectRatioSettingSection'
import TagSettingSection from './TagSettingSection'

interface Props {
  initialOptions: Options
}

export default class SettingPanel extends Component<Props> {
  render() {
    const {
      isExcludingHighAspectRatio,
      smallestIncludableAspectRatio,
      excludingTags,
    } = this.props.initialOptions

    return (
      <div>
        <AspectRatioSettingSection
          initial_is_excluding_high_aspect_ratio={isExcludingHighAspectRatio}
          initial_smallest_includable_aspect_ratio={
            smallestIncludableAspectRatio
          }
          update={setAspectRatioSettings}
        />
        <TagSettingSection
          initialTags={excludingTags}
          update={setExcludingTags}
        />
      </div>
    )
  }
}
