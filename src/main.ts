import './styles/index.css';
import { mount } from 'svelte';
import Orbit from './orbit/Orbit.svelte';
import { hoverConfigState } from '$lib/state/hoverConfig.svelte';
import { searxngHoverConfigs } from './orbit/configs';
import { markWrapExclusions } from './orbit/exclusions';
import { carryCursorAcrossPages } from './orbit/cursor';
import { bindOrbitPreferences } from './preferences';

hoverConfigState.addConfigs(searxngHoverConfigs);
markWrapExclusions();
bindOrbitPreferences();
mount(Orbit, { target: document.body });
carryCursorAcrossPages();
