<?php

namespace Drupal\hybride_ws_wissenskarte\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Povides a simple block to display the models
 * that where associated with a project called by
 * an action on the knowledge map.
 *
 * @Block(
 *  id="hybride_ws_wissenskarte_block",
 *  admin_label = @Translation("Hybride WS Block")
 *
 * )
 */

 class HybrideWSWissenskarteBlock extends BlockBase {

    public function build() {
        return ['#markup' => 'Projekte'];
    }
 }