<?php
/**
 * Created by PhpStorm.
 * User: julien
 * Date: 26.08.19
 * Time: 11:03
 */

namespace Drupal\hybride_ws_wissenskarte\Controller;


use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class HybrideWSWissenskarteController extends ControllerBase
{

    public function showKnowledgeMap() {
        global $base_url;
        $render_html = [
            '#type' => 'markup',
            '#markup' => '<h3>Wissenskarte</h3><div id="visualization"></div>',
        ];
        $render_html['#attached']['library'][] = 'hybride_ws_wissenskarte/hexagon';
        $render_html['#attached']['drupalSettings']['baseUrl'] = $base_url;
        /*
        return [
            '#theme' => 'dt_procedure',
        ];
        */
        return $render_html;
    }

    public function test() {
        $nodes = $this->_get_nodes_by_term(12);


        return ['#markup' => 'Test'];
    }

    public function display_projects($term_id) {
        global $base_url;
        $nodes = $this->_get_nodes_by_term($term_id);
	//dsm($nodes);
        foreach ($nodes as $node) {
            $model_name = $node->get('title')->value;
            $node_id = $node->id();
            $path = $base_url . '/node/' . $node_id;
            $list[] = '<li>' . '<a href="' . $path . '">' . $model_name . '</a></li>';
          }
          //Build an unordered list
          $list_start_item = "<ul>";
          foreach ($list as $list_item) {
            $list_start_item .= $list_item;
          }
          $list_start_item .= "</ul>";

          return new JsonResponse($list_start_item);

    }



    public function getTermIdByTermName($termName){
        $connection = \Drupal::database();
        $result = $connection->query('SELECT tid FROM {taxonomy_term_field_data}
                                            WHERE name = :name', [':name' => $termName])
                              ->fetchAll();
        $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')
          ->loadByProperties(['name' => $termName]);
        $tid = $result[0]->tid;
        return $tid;
    }

    function _get_nodes_by_term($term_id) {

        //$query = \Drupal::database()->select('taxonomy_index', 'ti');
        //$query->fields('ti', ['nid']);
        //$query->condition('ti.tid', $term_id);
        //$nodes = $query->execute()->fetchAssoc();

	$nodes = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_disziplinen' => $term_id]);
	//dsm($nodes);
        foreach($nodes as $node) {
            $nids[] = $node->nid;
        }

        $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
        if(!is_null($nids)) {
            return $nodes;
        } else {
            \Drupal::messenger()->addMessage('Fehler im HbridWSController');
        }

    }



}
