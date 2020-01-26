import { h, Component } from 'preact'
import {
  Options,
  setAspectRatioSettings,
} from '../lib/options'
import AspectRatioSettingSection from './AspectRatioSettingSection'

interface Props {
  initialOptions: Options
}

export default class SettingPanel extends Component<Props> {
  render() {
    const {
      isExcludingHighAspectRatio,
      smallestIncludableAspectRatio,
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
      </div>
    )
  }
}
