<?php

namespace Drupal\hybride_ws_wissenskarte\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a simple block to display the knowledge
 * map on 'Steckbrief' nodes.
 *
 * @Block(
 *  id="hybride_ws_wissenskarte_svg_block",
 *  admin_label = @Translation("TODO")
 *
 * )
 */

class HybrideWSWissenskarteSvgBlock extends BlockBase {

  public function build() {
    global $base_root, $base_path;
    $wkUrl = $base_root . $base_path . drupal_get_path('module', 'hybride_ws_wissenskarte') . '/images/' . "hybridwkbase.PNG";

    $form = [
      '#items' => array(),
      '#attached' => array(
        'library' => array('hybride_ws_wissenskarte/block-wk'),
      )];

    $form['#attached']['drupalSettings']['hybride_ws_wissenskarte']['wkUrl'] = $wkUrl;

    return $form;
  }
}
